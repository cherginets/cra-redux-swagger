import React from "react";
import PropTypes from "prop-types";
import Helper from "src/common/Helper";
import "./Table.scss";

const columnDefaults = {
    sortable: false,
};

class Table extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.getInitState(props);

        this.getInitState = this.getInitState.bind(this);
        this.getColumns = this.getColumns.bind(this);

        this.doSort = this.doSort.bind(this);

        this.onSelect = this.onSelect.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
        this.onMove = this.onMove.bind(this);

        this.renderHead = this.renderHead.bind(this);
        this.renderBody = this.renderBody.bind(this);
    }
    getInitState(props = this.props) {
        return {
            columns: this.getColumns(props.columns),
            data: Helper.copy_obj(props.data),

            selected: [],
            selectedRows: [],
            selectedAll: false,

            sortCol: this.props.initialSort || "",
            sortDesc: false,
            dragFrom: -1,
            dragOver: -1,
            dragOverPrev: -1
        };
    }
    getColumns(columns) {
        return columns;
    }
    componentDidUpdate(prevProps) {
        if(prevProps.reload !== this.props.reload) {
            this.setState(this.getInitState())
        }
    }

    doSort(accessor, desc = this.state.sortDesc) {
        if (this.props.allowUnsorted) {
            if(accessor === this.state.sortCol && this.state.sortDesc) {
                accessor = false;
                desc = true;
            } else {
                desc = !this.state.sortDesc
            }
        } else {
            if (accessor === this.state.sortCol) desc = !this.state.sortDesc;
            else desc = false;
        }

        this.setState({
            sortCol: accessor,
            sortDesc: desc
        });
        this.props.onSort(accessor, desc);
    }

    rowClass(row, index) {
        let resultClass = "table__row";
        if (this.state.dragFrom !== -1) {
            if ((index === this.state.dragFrom)) resultClass += " table__row_on-drag";
            if ((index !== this.state.dragFrom) && (index === this.state.dragOver)) {
                if (index < this.state.dragFrom)
                    resultClass += " table__row_drop-before";
                else
                    resultClass += " table__row_drop-after";
            }
        }
        return resultClass;
    }

    onSelect(row) {
        let {selected, selectedRows, selectedAll} = this.state;
        const {columnAccessorId, data} = this.props;

        const index = selected.indexOf(row[columnAccessorId]);

        if(index > -1) {
            selected.splice(index, 1);
            selectedRows.splice(index, 1);
            selectedAll = false;
        } else {
            selected.push(row[columnAccessorId]);
            selectedRows.push(row);
            selectedAll = data.length === selected.length;
        }

        this.setState({selected, selectedRows, selectedAll},
            () => this.props.onSelect(row, selected, selectedRows));
    }
    onSelectAll() {
        let {selectedAll, selected, selectedRows, data} = this.state,
            {columnAccessorId} = this.props;

        if (selectedAll) {
            selectedAll = false;
            selected = [];
            selectedRows = [];
        } else {
            selectedAll = true;
            selected = data.map((item) => item[columnAccessorId]);
            selectedRows = Helper.copy_obj(data);
        }

        this.setState({selectedAll, selected, selectedRows},
            () => this.props.onSelectAll(selected, selectedRows));
    }

    onMove(start, end, row_start, row_end) {
        let {data} = this.state;
        const promise = this.props.onMove(start, end, row_start, row_end),
            callback = () => {
                if(end > start) {
                    data.splice(end + 1, 0, row_start);
                    data.splice(start, 1);
                } else if(end < start) {
                    data.splice(start, 1);
                    data.splice(end, 0, row_start);
                }
                this.setState({data});
            };

        if(!Helper.is_promise(promise)) callback();
        else promise.then(callback);
    }

    render() {
        if(!this.state.data || this.state.data.length === 0) {
            return <div className={"table__no-found"}>
                {this.props.noDataMessage}
            </div>;
        }

        return <table className={"table table-striped"} >
            {this.renderHead()}
            {this.renderBody()}
        </table>;
    }
    renderHead() {
        const {columns} = this.state,
            {canSelect, canSelectAll} = this.props;

        return <thead>
        <tr>
            {/* Столбец выделения строк */}
            {canSelect && <th className="table__data table__data_compact">
                {canSelect && canSelectAll &&
                <input
                    type={"checkbox"}
                    checked={this.state.selectedAll}
                    onChange={this.onSelectAll}
                />}
            </th>}
            {columns.map((column, key) => {
                let sortable = !!column.sortable;

                let classNames = ["table__header"];
                if(column.classTh) classNames.push(column.classTh);

                return <th key={key} className={classNames.join(" ")}>
                    <div className="table__col">
                        <div className={"table__colname"}>
                            {column.Header}
                        </div>
                    </div>
                </th>
            })}
        </tr>
        </thead>
    }
    renderBody() {
        let {selected, data} = this.state,
            {columnAccessorId} = this.props;

        return <tbody>
        {data.map((row, index) => {
            return <tr
                key={row[columnAccessorId]}
                className={this.rowClass(row, index)}
                onDragOver={e => e.preventDefault()}
                onDragEnter={() => this.setState({dragOver: index})}
                onDragLeave={() => this.setState({dragOverPrev: index})}
                onDrop={e => {
                    e.preventDefault();
                    if(this.state.dragFrom === index) return false;
                    this.onMove(this.state.dragFrom, this.state.dragOver, data[this.state.dragFrom], data[this.state.dragOver]);
                }}
            >
                {
                    this.props.canSelect &&
                    <td className="table__data table__data_compact">
                        <input
                            type={"checkbox"}
                            checked={selected.indexOf(row[columnAccessorId]) > -1}
                            onChange={this.onSelect.bind(this, row)}
                            onClick={e => e.stopPropagation()}
                        />
                    </td>
                }
                {
                    this.props.columns.map((col, subindex) => <td colSpan={col.colspan || null}
                                                                  className={["table__data", col.className || ""].join(" ")}
                                                                  key={subindex}>
                        <div className="table__cell">
                            {
                                (typeof col.Cell === "function")
                                    ? col.Cell(row, index, col)
                                    : col.Cell || row[col.accessor]
                            }
                            {this.props.canMove && !row._not_drag && (subindex === this.props.columns.length - 1) &&
                            <div
                                className="table__draggable"
                                draggable={this.props.canMove}
                                onDragStart={(e) => {
                                    e.dataTransfer.setData("text", "foo");
                                    if (row.groupId) this.setState({dragFrom: index, dragOver: -1, dragGroup: row.groupId});
                                    else this.setState({dragFrom: index, dragOver: -1});
                                }}
                                onDragEnd={e => {
                                    e.preventDefault();
                                    this.setState({dragFrom: -1, dragOver: -1, dragOverPrev: -1, dragGroup: false})
                                }}
                            >
                                X
                            </div>
                            }
                        </div>
                    </td>)
                }
            </tr>
        })}
        </tbody>
    }
}

Table.defaultProps = {
    noDataMessage: "Нет данных",

    columnAccessorId: "id",
    columnDefaults,

    canSelect: false,
    canSelectAll: false,
    onSelect: (row, selected, selectedRows) => {},
    onSelectAll: (selected, selectedRows) => {},

    onSort: (col, desc) => {},
    allowUnsorted: true,

    // Костыльный проброс пропсов в Pager
    pager: true,
    offset: 0,
    limit: 0,
    total: 0,
    onPrev: ()=>{},
    onNext: ()=>{},
    onMove: () => {},

    reload: 0,
};

const columnModel = PropTypes.shape({
    classTh: PropTypes.string,
    classTd: PropTypes.string,

    // Описывает что отображать в заголовке колонки. Если не задано - ничего не отобразится.
    // (иконка сортировки рисуется отдельно от Header и не может быть отменена в этом поле)
    // Может быть задано как функция (без аргументов)
    Header: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
    // Описывает что отображать в ячейке. Если не задано - отобразится row[accessor]
    // Если задано как функция, то принимает аргумент row (объект строки). Например: Cell: row => `ID = ${row.id}`
    Cell: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
    accessor: PropTypes.string, // Строковый идентификатор колонки (в рамках одной таблицы).
    sortable: PropTypes.bool, // Можно ли сортировать по этой колонке. По умолчанию - true
});

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(columnModel).isRequired,
    columnDefaults: columnModel, // Параметры по умолчанию для всех колонок (сюда нельзя указать accessor)

    noDataMessage: PropTypes.string, // Сообщение которое покажется если данных нет
    columnAccessorId: PropTypes.string, // Используется для идентификации строк, если не задан - берется "id"

    canSelect: PropTypes.bool, // Можно ли выделять строки. По умолчанию - false
    canSelectAll: PropTypes.bool, // Можно ли выделить все строки. По умолчанию - true
    onSelect: PropTypes.func, // Вызывается при выборе строки, (row, checked) => {} // checked значение которое получило строка true или false
    onSelectAll: PropTypes.func, // (checked) => {..some code}

    // Вызывается при нажатии на заголовок. В аргументах передаются код колонки и направление сортировки.
    // пример: onSort: (column, direction) => {..some code}
    onSort: PropTypes.func,
    initialSort: PropTypes.string,
    allowUnsorted: PropTypes.bool, // Если true, то при сортировке будет промежуточное состояние null:  asc -> desc -> null

    canSearch: PropTypes.bool, // Есть ли элемент с лупой над таблицей. Можно ли искать по таблице. По умолчанию - false
    onSearch: PropTypes.func, // onSearch: (search_string) => {...some code}
    canAdvanced: PropTypes.bool, // Расширениный поиск для search
    onAdvancedOpen: PropTypes.func, // Расширениный поиск для search

    // Drag & Drop
    canMove: PropTypes.bool, // Можно ли перетаскивать строки. По умолчанию - false
    // (start, end, row_start, row_end) => {...some code} // Индексы первоначального нахождения элемента и конечного
    // Если вернёт Promise, то строки переместятся только после resolve.
    // Если вернёт НЕ Promise, то строки переместятся моментально
    onMove: PropTypes.func,

    // pager: PropTypes.bool,
    // Костыльный проброс пропсов в Pager
    // offset: PropTypes.number.isRequired,
    // limit: PropTypes.number.isRequired,
    // total: PropTypes.number.isRequired,
    // onPrev: PropTypes.func.isRequired,
    // onNext: PropTypes.func.isRequired,

    reload: PropTypes.number, // Передать (+ new Date()) что бы ресетнуть таблицу
};

export default Table;

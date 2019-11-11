import React from "react";
import PropTypes from "prop-types";
import "./Table.scss";
import Helper from "../../common/Helper";

class Table extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.getInitState(props);

        this.renderSortIcon = this.renderSortIcon.bind(this);
        this.doSort = this.doSort.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
    }
    getInitState(props = this.props) {
        return {
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
    componentDidUpdate(prevProps) {
        if(prevProps.reload !== this.props.reload) {
            this.setState(this.getInitState())
        }
    }

    renderSortIcon(accessor) {
        let iconClass = <span className={"ml-1"}>III</span>;
        if (accessor === this.state.sortCol) {
            iconClass = this.state.sortDesc ? <span className={"ml-1"}>&#8657;</span> : <span className={"ml-1"}>&#8659;</span>;
        }
        return iconClass
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
        let {selectedAll, selected, selectedRows} = this.state,
            {columnAccessorId, data} = this.props;

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
    renderRow(row, index) {
        let {selected} = this.state,
            {columnAccessorId} = this.props;

        return <tr
            key={index}
            className={this.rowClass(row, index)}
            onDragOver={e => e.preventDefault()}
            onDragEnter={() => this.setState({dragOver: index})}
            onDragLeave={() => this.setState({dragOverPrev: index})}
            onDrop={e => {
                e.preventDefault();
                (this.state.dragFrom !== index) && this.props.onMove(this.state.dragFrom, this.state.dragOver, this.props.data[this.state.dragFrom], this.props.data[this.state.dragOver])
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
    }

    render() {
        return(
            <div id={this.props.id} className="flex-column" style={{width: "100%", overflow: "hidden", height: "100%"}}>
                <div className={"table flex-column"}>
                    <table className={"table flex-column"}>
                        <thead>
                        <tr>
                            {this.props.canSelect &&
                            <th className="table__data table__data_compact">
                                {this.props.canSelect && this.props.canSelectAll && <input type={"checkbox"} checked={this.state.selectedAll} onClick={this.onSelectAll}/>}
                            </th>
                            }
                            {
                                this.props.columns.map((col, index) => {
                                    let sortable = true;
                                    if (typeof col.sortable === "boolean") sortable = col.sortable;
                                    return <th colSpan={col.headerColspan || null} key={index} className={["table__header", col.className || ""].join(" ")}>
                                        <div className="table__col">
                                            <div
                                                id={`${this.props.id}-header-${col.accessor}`}
                                                className={"table__colname" + ((col.accessor === this.state.sortCol) ? " table__colname_sorted" : "")}
                                                onClick={() => this.doSort(col.accessor)}
                                            >
                                                {!!col.accessor && (typeof col.Header === "function") ? col.Header() : col.Header || col.accessor}
                                                {!!col.accessor && sortable && this.renderSortIcon(col.accessor)}
                                            </div>
                                        </div>
                                    </th>
                                })
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.data.map((row, index) => this.renderRow(row, index))}
                        </tbody>
                    </table>
                    {(!this.props.data || this.props.data.length === 0) && <div className={"table__no-found"}>
                        {this.props.noDataMessage}
                    </div>}
                </div>
            </div>
        );
    }
}

Table.defaultProps = {
    id: "table",
    canSelect: false,
    canSelectAll: false,
    columnAccessorId: "id",
    selectedAll: undefined,
    onSelect: (row, selected, selectedRows) => {},
    onSelectAll: () => {},
    onSort: (col, desc) => {},
    allowUnsorted: true,
    onSearch: (value) => {},
    onAdvancedOpen: () => {},
    canAdvanced: false,

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

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
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
    })).isRequired,

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

    canSearch: PropTypes.bool, // Есть ли элемент с лупой над таблицей. Можно ли искать по таблице. По умолчанию - false
    onSearch: PropTypes.func, // onSearch: (search_string) => {...some code}
    canAdvanced: PropTypes.bool, // Расширениный поиск для search
    onAdvancedOpen: PropTypes.func, // Расширениный поиск для search

    // Drag & Drop
    canMove: PropTypes.bool, // Можно ли перемещать строки. По умолчанию - false
    onMove: PropTypes.func, // (start, end, row_start, row_end) => {...some code} // Индексы первоначального нахождения элемента и конечного

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

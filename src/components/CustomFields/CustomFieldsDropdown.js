import React, { Component } from 'react'
import styles from './CustomFields.module.scss'
import {
  CustomFields,
  DropdownEllipse,
  EllipseChecked
} from '../../assets/svg'

class CustomFieldsDropdown extends Component {
  constructor(props) {
    super(props)
    const { title } = this.props

    this.state = {
      listOpen: false,
      headerTitle: title,
      keyword: ''
    }

    this.searchField = React.createRef()
    this.close = this.close.bind(this)
  }

  componentDidUpdate() {
    const { listOpen } = this.state
    setTimeout(() => {
      if (listOpen) {
        window.addEventListener('click', this.close)
      } else {
        window.removeEventListener('click', this.close)
      }
    }, 0)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.close)
  }

  static getDerivedStateFromProps(nextProps) {
    const count = nextProps.list.filter(item => item.selected).length

    if (count === 0) {
      return { headerTitle: nextProps.title }
    }
    if (count === 1) {
      return { headerTitle: `${count} ${nextProps.titleHelper}` }
    }
    if (count > 1) {
      if (nextProps.titleHelperPlural) {
        return { headerTitle: `${count} ${nextProps.titleHelperPlural}` }
      }
      return { headerTitle: `${count} ${nextProps.titleHelper}s` }
    }

    return null
  }

  close() {
    this.setState({
      listOpen: false
    })
  }

  toggleList() {
    this.setState(
      prevState => ({
        listOpen: !prevState.listOpen
      }),
      () => {
        if (this.state.listOpen && this.searchField.current) {
          this.searchField.current.focus()
          this.setState({
            keyword: ''
          })
        }
      }
    )
  }

  filterList(e) {
    this.setState({
      keyword: e.target.value.toLowerCase()
    })
  }

  listItems() {
    const { list, toggleItem, searchable } = this.props
    const { keyword } = this.state
    let tempList = list

    if (keyword.length) {
      tempList = list
        .filter(item =>
          item.title
            .toLowerCase()
            .slice(0, keyword.length)
            .includes(keyword)
        )
        .sort((a, b) => {
          if (a.title < b.title) {
            return -1
          }
          if (a.title > b.title) {
            return 1
          }
          return 0
        })
    }

    if (tempList.length) {
      return tempList.map(item => (
        <button
          type="button"
          className={styles.ddListItem}
          key={item.id}
          onClick={() => toggleItem(item.id, item.key)}
        >
          {item.selected ? <EllipseChecked /> : <DropdownEllipse />}
          {item.title}
        </button>
      ))
    }

    return (
      <div className={[styles.ddListItem, styles.noResult]}>
        {searchable[1]}
      </div>
    )
  }

  render() {
    const { searchable } = this.props
    const { listOpen, headerTitle } = this.state
    return (
      <div className={styles.ddWrapper}>
        <button
          type="button"
          className={styles.ddHeader}
          onClick={() => this.toggleList()}
        >
          <div className={styles.ddHeaderTitle}>
            <CustomFields /> {headerTitle}
          </div>
        </button>

        {listOpen && (
          <div
            role="list"
            className={`${styles.ddList} ${styles.ddListMultiple}`}
            onClick={e => e.stopPropagation()}
          >
            {searchable && (
              <input
                ref={this.searchField}
                className={styles.ddListSearchBar}
                placeholder={searchable[0]}
                onChange={e => this.filterList(e)}
              />
            )}
            <div className={styles.ddScrollList}>{this.listItems()}</div>
          </div>
        )}
      </div>
    )
  }
}

export default CustomFieldsDropdown

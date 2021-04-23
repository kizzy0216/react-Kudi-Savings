
import React, { Component } from 'react'
import styles from './Dropdown.module.scss'
import { ChevronDown } from '../../../assets/svg'

class Dropdown extends Component {
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

  // static getDerivedStateFromProps(nextProps) {
  //   const { list, title } = nextProps

  //   const selectedItem = list.filter(item => item.selected)

  //   if (selectedItem.length) {
  //     return {
  //       headerTitle: selectedItem[0].title
  //     }
  //   }
  //   return { headerTitle: title }
  // }

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

  close() {
    this.setState({
      listOpen: false
    })
  }

  selectItem(title, id) {
    const { resetThenSet } = this.props
    this.setState(
      {
        headerTitle: title,
        listOpen: false
      }
    )
    resetThenSet(id);
    
  }

  toggleList() {
    this.setState(
      prevState => ({
        listOpen: !prevState.listOpen,
        keyword: ''
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
    const { list, searchable } = this.props
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
          onClick={() => this.selectItem(item.title, item.id)}
        >
          {item.title}
        </button>
      ))
    }

    return (
      <div className={`${styles.ddListItem} ${styles.noResult}`}>
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
          <div className={styles.ddHeaderTitle}>{headerTitle} <ChevronDown /></div>
        </button>
        {listOpen && (
          <div
            role="list"
            className={styles.ddList}
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

export default Dropdown

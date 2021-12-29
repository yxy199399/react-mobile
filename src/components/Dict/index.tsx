import React from 'react'
import { connect } from 'react-redux'
import { dictAction } from '@/store/actionCreators'
interface IProps {
  dictType: string
  dictValue: string | number
  dict: {
    [key: string]: {
      list: any[]
    }
  }
  dictChange: (dictType: string) => void
}
function Dict({ dict, dictType, dictChange, dictValue }: IProps) {
  const dictItem = dict[dictType]
  if (!dictItem) {
    dictChange(dictType)
  }
  const sel = (dictItem?.list || []).find((item) => item.value === dictValue)
  return <span>{sel?.label || '--'}</span>
}

const stateToProps = (state: AllState) => {
  console.log(state.dict)
  return {
    dict: state.dict,
  }
}

const dispatchToState = (dispatch: Dispatch) => {
  return {
    dictChange: (dictType: string) => {
      dispatch(dictAction(dictType) as any)
    },
  }
}

export default connect(stateToProps, dispatchToState)(Dict)

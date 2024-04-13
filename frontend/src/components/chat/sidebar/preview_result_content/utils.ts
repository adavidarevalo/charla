import moment from 'moment'
import { User } from '../../../../types/user.type'
import { ISearchedResult } from '../context'
import { Conversation } from '../../../../types/conversation.type'
import { getConversationPicture } from '../../utils'

export const getConversationName = (user: User, users: User[]) => {
  return users[0]._id === user._id ? users[1].name : users[0].name
}

export const dateHandler = (date: string) => {
  const now = moment()
  const momentDate = moment(date)
  const time = momentDate.fromNow(true)
  const dateByHourAndMin = momentDate.format('HH:mm')

  const getDay = () => {
    const days = time.split(' ')[0]
    if (Number(days) < 8) return now.subtract(+days, 'days').format('dddd')

    return momentDate.format('DD/MM/YYYY')
  }

  if (time === 'a few seconds') return 'Now'

  if (time.search('minute') !== -1) {
    const mins = time.split(' ')[0]
    if (mins === 'a') return '1 min'

    return `${mins} min`
  }

  if (time.search('hour') !== -1) return dateByHourAndMin

  if (time === 'a day') return 'Yesterday'

  if (time.search('days') !== -1) {
    return getDay()
  }

  return time
}

export const getConversationId = (user: User, users: User[]) => {
  return users[0]._id === user._id ? users[1]._id : users[0]._id
}

export const getVariables = (
  data: Conversation | ISearchedResult,
  isSearching: boolean,
  user: User
) => {
  const isGroup = data.isGroup

  const receiver_id = isSearching
    ? data._id
    : getConversationId(user, (data as Conversation).users)

  const picture = isSearching
    ? data.picture
    : getConversationPicture(user, (data as Conversation).users)

  const name = isSearching
    ? data.name
    : getConversationName(user, (data as Conversation).users)

  const subtitle = isSearching
    ? data.name
    : (data as Conversation).latestMessage?.message

  return {
    receiver_id,
    picture,
    name,
    subtitle
  }
}

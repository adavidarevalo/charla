export interface ICreateConversationData {
  _id?: string
  name: string
  picture: string
  isGroup: boolean
  users: [string, string]
}

export interface ICreateMessage {
  _id?: string
  sender: string
  message: string
  conversation: string
  files?: Array<{
    url: string
    name: string
    type: string
  }>
}

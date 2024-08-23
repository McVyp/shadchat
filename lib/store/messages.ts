import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { LIMIT_MESSAGES } from "../const";

export type IMessage = {
    created_at: string;
    id: string;
    is_edit: boolean;
    send_by: string;
    text: string;
    users: {
        avatar_url: string;
        created_at: string;
        display_name: string;
        id: string;
    } | null;
}

interface MessageState{
    hasMore: boolean,
    page: number;
    messages: IMessage[];
    actionMessage: IMessage | undefined
    addMessage: (message: IMessage) => void;
    optimisticIds: string[],
    setActionMessage: (message:IMessage|undefined)=> void;
    optimisticDeleteMessage:(messageId: string)=> void;
    optimisticEditMessage:(message: IMessage)=> void;
    setOptimisticIds: (id: string)=> void;
    setMessages:(messages: IMessage[]) => void;
}

export const useMessage = create<MessageState>((set)=>({
    hasMore: true,
    page: 1,
    messages:[],
    actionMessage: undefined,
    setMessages:(messages) =>
            set((state)=>({
                messages:[...messages, ...state.messages], 
                page: state.page + 1,
                hasMore: messages.length >= LIMIT_MESSAGES
            })),
    optimisticIds:[],
    setOptimisticIds: (id:string) => set((state)=>({optimisticIds:[...state.optimisticIds, id]})),
    addMessage:(newMessages) =>set((state)=>({messages:[...state.messages, newMessages]})),
    setActionMessage:(message)=>set(()=>({actionMessage:message})),
    optimisticDeleteMessage: (messageId)=> set((state)=>{
        return {
            messages: state.messages.filter(
                (message)=> message.id !== messageId
            )
        }
    }),
    optimisticEditMessage: (updateMessage)=> set((state)=>{
        return {
            messages: state.messages.filter(
                (message)=> {
                    if(message.id === updateMessage.id){
                        (message.text = updateMessage.text),
                        (message.is_edit = updateMessage.is_edit);
                    }
                    return message;
                }
            )
        }
    })
}))
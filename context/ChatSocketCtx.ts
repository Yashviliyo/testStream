import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

export interface ChatSocketCtxState {
    socket: Socket;
  }
  
  export const ChatSocketCtx = createContext<ChatSocketCtxState>(
    {} as ChatSocketCtxState
    // for escaping the eslint error
    // you can write something like this instead to match your 
    // predefined type
    /*
    {
        socket: io(),
      ...
    }
    */
  );
  
  export const useChatSocketCtx = () => useContext(ChatSocketCtx);
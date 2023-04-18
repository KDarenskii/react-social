import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { SocketContext } from ".";

type Props = {
    children: React.ReactNode;
};

const SocketProvider: React.FC<Props> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
};

export default SocketProvider;

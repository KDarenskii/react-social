import { where, query, getDocs, collection, addDoc, getDoc, doc, orderBy } from "firebase/firestore";
import db from "../db.js";

class MessageService {
    async getByConversationId(conversationId) {
        const q = query(collection(db, "messages"), where("conversationId", "==", conversationId), orderBy("time"));
        const response = await getDocs(q);
        const messagesData = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        return messagesData;
    }

    async getById(id) {
        const docRef = doc(db, "messages", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            throw new Error({ message: "Not Found", status: 404 });
        }
        const data = docSnap.data();
        return { ...data, id: docSnap.id };
    }

    async add(message) {
        const docRef = await addDoc(collection(db, "messages"), {
            ...message,
            time: new Date().toISOString(),
        });
        const messageData = await this.getById(docRef.id);
        return messageData;
    }
}

export default new MessageService();

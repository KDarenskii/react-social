import { where, query, getDocs, collection } from "firebase/firestore";
import db from "../db.js";

class ConversationService {
    async getByUserId(userId) {
        const q = query(collection(db, "conversations"), where("members", "array-contains", userId));
        const response = await getDocs(q);
        const conversationsData = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        return conversationsData;
    }
}

export default new ConversationService();

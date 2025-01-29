import firestore from '@react-native-firebase/firestore';

export const addDocument = async (collection: string, data: any) => {
  try {
    const docRef = await firestore().collection(collection).add(data);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

export const getDocument = async (collection: string, docId: string) => {
  try {
    const doc = await firestore().collection(collection).doc(docId).get();
    return doc.exists ? doc.data() : null;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

export const updateDocument = async (
  collection: string,
  docId: string,
  data: any,
) => {
  try {
    await firestore().collection(collection).doc(docId).update(data);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteDocument = async (collection: string, docId: string) => {
  try {
    await firestore().collection(collection).doc(docId).delete();
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

export const getCollection = async (collection: string) => {
  try {
    const querySnapshot = await firestore().collection(collection).get();
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error getting collection:', error);
    throw error;
  }
};

export const queryCollection = async (
  collection: string,
  field: string,
  operator: any,
  value: any,
) => {
  try {
    const querySnapshot = await firestore()
      .collection(collection)
      .where(field, operator, value)
      .get();
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error querying collection:', error);
    throw error;
  }
};

import { collection, getDoc, doc, addDoc, setDoc, updateDoc, getDocs, query, where } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

export async function useGetDoc(CollectionName, docID) {
  const db = useFirestore();
  try {
    const res = await getDoc(doc(db, CollectionName, docID)); // Getting the document from Firestore
    return res.data(); // Returning the data of the retrieved document
  } catch (error) {
    return null; // Returning null if an error occurred
  }
}
export async function useAddDoc(CollectionName, data) {
  // Get the Firestore instance from the Nuxt app context
  const db = useFirestore();
  try {
    // Add the document to the specified collection
    const res = await addDoc(collection(db, CollectionName), data);
    // console.log(res);
    return { message: 'document added successfully', docID: res.id }; // Return a success message
  } catch (error) {
    return null; // Return null to show error message
  }
}
export async function useSetDoc(CollectionName, docID, data) {
  // Get the Firestore instance from the Nuxt app context
  const db = useFirestore();
  try {
    await setDoc(doc(db, CollectionName, docID), data);
    return true;
  } catch (error) {
    return false;
  }
}
export async function useUpdateDoc(CollectionName, docID, data) {
  // Get the Firestore instance from the Nuxt app context
  const db = useFirestore();
  try {
    // Add the document to the specified collection
    await updateDoc(doc(db, CollectionName, docID), data);
    return { message: 'Document updated successfully' }; // Return a success message
  } catch (error) {
    return null; // Return an error message
  }
}
export async function useGetDocs(CollectionName) {
  // Get the Firestore instance from the Nuxt app context
  const db = useFirestore();
  try {
    const querySnapshot = await getDocs(collection(db, CollectionName)); // Getting the query snapshot of the specified collection

    const docs = []; // Initializing an empty array to store the documents
    querySnapshot.forEach((item) => {
      // Looping through each document in the query snapshot
      docs.push({ docdata: item.data(), docID: item.id }); // Adding the document data to the array
    });
    return docs;
  } catch (error) {
    return null; // Return null to show error message
  }
}

export async function useGetUserDocs(CollectionName, whereClause) {
  // Get the Firestore instance from the Nuxt app context
  const db = useFirestore();
  try {
    // Get a query against the collection where the userid matches the given uid
    const q = query(collection(db, CollectionName), where(whereClause.field, '==', whereClause.value));
    const querySnapshot = await getDocs(q);

    const docs = [];
    querySnapshot.forEach((item) => {
      docs.push({ docdata: item.data(), docID: item.id });
    });
    return docs;
  } catch (error) {
    console.log(error);
    return 'Error while retrieving documents';
  }
}

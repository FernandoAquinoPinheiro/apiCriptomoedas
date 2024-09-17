import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { firestore } from "../Firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function Home({ navigation }) {
    const [criptos, setCriptos] = useState([]);

    async function deleteCripto(id) {
        try {
            await deleteDoc(doc(firestore, "tbmoeda", id));
            Alert.alert("Criptomoeda deletada com sucesso.");
        } catch (error) {
            console.error("Erro ao deletar criptomoeda.", error);
        }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, 'tbmoeda'), (querySnapshot) => {
            const lista = [];
            querySnapshot.forEach((doc) => {
                lista.push({ ...doc.data(), id: doc.id });
            });
            setCriptos(lista);
        });
        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Criptomoedas</Text>
            <FlatList
                data={criptos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.cryptoContainer}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("AlteraCriptos", {
                                    id: item.id,
                                    nomeCripto: item.nomeCripto,
                                    siglaCripto: item.siglaCripto,
                                    valorCripto: item.valorCripto,
                                })
                            }
                        >
                            <View style={styles.itemContainer}>
                                <Text>Criptomoeda: <Text>{item.nomeCripto}</Text></Text>
                                <Text>Sigla: <Text>{item.siglaCripto}</Text></Text>
                                <Text>Valor: <Text>{item.valorCripto}</Text></Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteCripto(item.id)}
                        >
                            <Text style={styles.deleteText}>X</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('CadastrarCriptos')}
            >
                <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginTop: 50,
        fontSize: 30,
    },
    itemContainer: {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
    },
    cryptoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#0000CD',
        borderRadius: 10,
        alignItems: 'center',
    },
    deleteButton: {
        marginLeft: 10,
    },
    deleteText: {
        color: 'red',
        fontSize: 20,
    },
    addButton: {
        backgroundColor: '#ffffff',
        borderRadius: 50,
        position: 'absolute',
        right: 20,
        bottom: 40,
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
    },
    addText: {
        fontSize: 30,
        color: '#0000CD',
    },
});

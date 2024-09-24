import React,{ useEffect, useState } from "react";
import { View,Text,StyleSheet,FlatList, TouchableOpacity,Alert,ImageBackground } from "react-native";
import { firestore } from "../Firebase"; 
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore"; 

export default function Home({navigation}) {
           
    const [criptos, setCriptos] = useState([]);

    async function deleteCripto(id) {
        try{
            await deleteDoc(doc(firestore,'tbmoeda',id));
            Alert.alert("A criptomoeda foi deletada.")
        }catch(error){
            console.error("Erro ao deletar.", error)
        }
    }
       
    useEffect(()=>{
        const unsubcribe = onSnapshot(collection(firestore,'tbmoeda'),(querySnapshot)=>{
            const lista = [];
            querySnapshot.forEach((doc)=>{
                lista.push({...doc.data(), id: doc.id});
            });
            setCriptos(lista);
        });
        return () => unsubcribe();
    },[]);

    return(
        <View style={estilo.container}>
             <ImageBackground source={require('../assets/fundoHome.jpg')}  style={{width: '100%', color:'red', fontSize:40, height: '100%', resizeMode:'contain', }}>   
            <View>
                <Text style={estilo.titulo} >Lista de Criptomoedas</Text>
            </View>
            <FlatList 
                data={criptos}
                renderItem={({item})=>{
                    return(
                        <View style={estilo.criptosstyle}>
                            <ImageBackground source={require('../assets/fundoCripto.jpg')} style={{width: '100%', height: '100%',  resizeMode: 'contain',}}> 
                            <TouchableOpacity onPress={()=>navigation.navigate("Alterar",{
                                id: item.id,
                                nomeCripto: item.nomeCripto,
                                siglaCripto: item.siglaCripto,
                                valorCripto: item.valorCripto
                            })}>
                                <View style={estilo.itens}>
                                    <Text style={estilo.nomeCripto}> Criptomoeda: <Text >{item.nomeCripto}</Text></Text>
                                    <Text style={estilo.nomeCripto}> Sigla: <Text>{item.siglaCripto}</Text></Text>
                                    <Text style={estilo.nomeCripto}> Valor: <Text>{item.valorCripto}</Text></Text>
                                </View>
                            </TouchableOpacity>
                            <View style={estilo.botaodeletar}>
                                <TouchableOpacity onPress={()=>{deleteCripto(item.id)}}>
                                <Text>X</Text>
                                </TouchableOpacity>    
                            </View>  
                             </ImageBackground>   
                        </View>    
                    );
                }}
            />
            <TouchableOpacity onPress={()=> navigation.navigate("Cadastrar")}>
                <Text>+</Text>
            </TouchableOpacity>
            </ImageBackground> 
        </View>
    );
}

const estilo = StyleSheet.create({
    container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    titulo:{
      marginTop: 50,
      fontSize:30,
        color: 'white',
        left: 50
    },
    itens:{
        color: 'red',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
    },
    nomeCripto: {
        fontSize: 25,
        color:"white",
    },
    titulocriptos:{
        fontSize: 13,
        color:'#fff',
    },
    textocriptos:{
        fontWeight: "bold",
    },
    criptosstyle:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 10,
      marginVertical: 10,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius:10
    },
    botaodeletar:{
        fontSize: 50,
        zIndex:1,
        color:'white',
      textAlignVertical: 'center',
      marginVertical: 20,
      left: 0,
    },
    addbutton:{
    backgroundColor: '#ffffff',
    borderRadius: 50,
    position: 'absolute',
    left: 20,
    bottom: 40,
    justifyContent: "center",
    alignItems: "center"
    }
});
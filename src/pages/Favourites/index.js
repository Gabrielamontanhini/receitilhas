import { useState , useEffect } from "react";
import { View, Text, StyleSheet , SafeAreaView , FlatList} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getFavorites } from "../../utils/storage"
import { FoodList } from "../../components/foodlist"

export function Favourites(){
    const [recipes, setRecipes] = useState([]);
    const isFocused = useIsFocused();

    useEffect(()=> {
        let isActive = true

        async function getRecipes(){
            const result = await getFavorites("@receitilhas");
            if (isActive){
                setRecipes(result)
            }
        }

        if (isActive){
            getRecipes();
        }

        return () => {
            isActive = false
        }


    }, [isFocused])
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Favoritos</Text>
            {recipes.length === 0 && (
                <Text> Sem receitas salvas ainda </Text>
            )}

            <FlatList 
            showsVerticalScrollIndicator={false}
            style={{marginTop: 14}}
            data={recipes}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => <FoodList data={item}/>}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F3F0FF',
        paddingStart: 14,
        paddingEnd: 14,
        paddingTop: 36
    },
    title:{
        color:"#000",
        fontWeight: 'bold',
        fontSize: 24
    }
})
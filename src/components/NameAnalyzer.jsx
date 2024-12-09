import { useState,useEffect } from "react";
import { Input,Button,VStack,Text } from "@chakra-ui/react";

export default function NameAnalyzer(){
    const[name,setName] = useState("");
    const[data,setData] = useState(null);
    const[error,setError] = useState("");
    
    const fetchData = async () => {
        if(!name) {
            setError("名前を入力してください。");
            setData(null);
            return;
        }

        try{
            setError("");
            const response = await fetch(`/.netlify/functions/analyzeName?name=${name}`);
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || "データ取得に失敗しました。");
            }
            const result = await response.json();
            setData(result);
            console.log("データ取得成功:",result);
        }catch(err){
            console.error("エラー:",err);
            setError(err.message || "不明なエラーが発生しました。");
            setData(null);
        }
    };

    return (
        <VStack spacing={4} align="stretch" bg="gray.100" p={4} borderRadius="md">
            <Input
              placeholder="名前を入力してください"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={fetchData} colorScheme="blue">
                分析する
            </Button>
            {error && <Text color="red.500">{error}</Text>}
            {data && (
                <VStack align="stretch" spacing={2}>
                    <Text>推定年齢: {data.age || "不明"}</Text>
                    <Text>推定性別: {data.gender || "不明"}</Text>
                    <Text>推定国籍:</Text>
                    {data.countries.map((country,index) => (
                        <Text key={index}>
                            {country.country_id}: {Math.round(country.probability * 100)}%
                        </Text>
                    ))}
                </VStack>
            )}
        </VStack>
    );
}
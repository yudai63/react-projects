import fetch from 'node-fetch';

export async function handler(event) {
    const name = event.queryStringParameters.name;
    if(!name){
        return{
            statusCode:400,
            headers:{
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({message:'名前を指定してください'}),
        };
    }    

    try{
        const [agifyResponse,genderizeResponse,nationalizeResponse] = await Promise.all([
            fetch(`https://api.agify.io?name=${name}`).then(res => res.json()),
            fetch(`https://api.genderize.io?name=${name}`).then(res => res.json()),
            fetch(`https://api.nationalize.io?name=${name}`).then(res => res.json()),
        ]);

        const result = {
            name,
            age: agifyResponse.age || "不明",
            gender: genderizeResponse.gender || "不明",
            countries: nationalizeResponse.country || [],
        };

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(result),
        };
    }catch(error){
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ error: "データ獲得に失敗しました。"}),
        };
    }
}
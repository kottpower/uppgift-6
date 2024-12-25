
class Api {

    static async getNameDay(dateString = '2024-01-01') {

        try {
            const [year, month, day] = dateString.split('-'); //Array destructuring

            const url = new URL('https://nameday.abalin.net/api/V1/getdate');
            const params = {
                'day': day,
                'month': month,
            }

            Object.keys(params)
                .forEach(key => url.searchParams.append(key, params[key]));

            const headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
            };

            console.log('nameDay url', url)

            const response = await fetch(url, {
                method: 'GET',
                headers
            })

            const data = await response.json();

            return data;
        } catch (err) {
            console.log('Något gick fel', err);
        }
    }

    static async getAgify(name) {

        try {
            const url = `https://api.agify.io?name=${name}`;
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (err) {
            console.log('Något gick fel', err);
        }


    }

}

export default Api;
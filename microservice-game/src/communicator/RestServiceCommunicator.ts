class RestServiceCommunicator {
    private readonly _baseUrl: string;

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    async sendGetRequest(endpoint: string) {
        try {
            const response = await fetch(`${this._baseUrl}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            return await response.json();
        } catch (error: any) {
            console.error('Error in GET request:', error.message);
            throw error;
        }
    }

    async sendPostRequest(endpoint: string, data: any) {
        try {
            const response = await fetch(`${this._baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            return await response.json();
        } catch (error: any) {
            console.error('Error in POST request:', error.message);
            throw error;
        }
    }
}
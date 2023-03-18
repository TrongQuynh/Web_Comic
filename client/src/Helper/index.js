export class Helper {
    setLocalStorage(key, value) {
        try {
            const preData = this.getLocalStorage(key);
            if (preData) {
                if (!this.checkComicExistInLocalStorage(key, value.id)) {
                    preData.push(value);
                    localStorage.setItem(key, JSON.stringify(preData));
                }

            } else {
                localStorage.setItem(key, JSON.stringify([value]));
            }

        } catch (error) {
            console.log("Error In setLocalStorage: " + error);
        }
    }

    getLocalStorage(key) {
        const rawData = localStorage.getItem(key)
        return rawData ? JSON.parse(rawData) : null;
    }

    checkComicExistInLocalStorage(key, comicID) {
        const data = this.getLocalStorage(key);
        if (data) {
            return data.find((comic, index) => comic.id === comicID);
        }
        return null;

    }
}
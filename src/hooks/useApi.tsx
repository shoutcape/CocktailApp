export enum SearchType {
    all = '',
    name = 'name',
    ingredient = 'ingredient',
}

export interface SearchResult {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
}

export interface Ingredient {
    idIngredient: string;
    strIngredient: string;
}

export interface DrinkDetails {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    strAlcoholic: string;
    strGlass: string;
    strCategory: string;

    strInstructions: string;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6: string;
    strIngredient7: string;
    strIngredient8: string;
    strIngredient9: string;
    strIngredient10: string;
    strMeasure1: string;
    strMeasure2: string;
    strMeasure3: string;
    strMeasure4: string;
    strMeasure5: string;
    strMeasure6: string;
    strMeasure7: string;
    strMeasure8: string;
    strMeasure9: string;
    strMeasure10: string;
}

export interface SearchError {
    Response: string;
    Error: string;
}



export const useApi = () => {
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/'

    const searchData = async (
        name: string,
        type: SearchType
    ): Promise<SearchResult[] | SearchError> => {
        let endpoint = '';
        switch (type) {
            case SearchType.name:
                endpoint = 'search.php?s=';
                break;
            case SearchType.ingredient:
                endpoint = 'filter.php?i=';
                break;
            default:
                endpoint = 'search.php?s=';
        }
        try {
            const result = await fetch(`${url}${endpoint}${name}`)
            const data = await result.json()
            if (!result.ok) {
                throw new Error('No results found')
            }
            return data
        } catch (ReferenceError) {
            return { Response: 'False', Error: 'Drinks not found' }
        }
    }

    const getDrinkDetails = async (id: string): Promise<DrinkDetails> => {
        const result = await fetch(`${url}lookup.php?i=${id}`)
        const data = await result.json()
        // stupid api returns an array with a single object
        return data.drinks[0]
    }

    const randomDrink = async (): Promise<SearchResult[]> => {
        const result = await fetch(`${url}random.php`)
        const data = await result.json()
        return data.drinks[0].idDrink
    }
    
    return { searchData, getDrinkDetails, randomDrink }
}

export default useApi
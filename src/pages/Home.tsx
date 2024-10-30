import { IonAvatar, IonButton, IonContent, IonFooter, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonViewWillEnter } from '@ionic/react';
import useApi, { SearchResult, SearchType } from '../hooks/useApi'
import { useEffect, useState } from 'react';
import './homepage.css'



const Home: React.FC = () => {

  const { searchData, randomDrink} = useApi()
  const [ randomdrink, setRandomDrinkId ] = useState<SearchResult[] | null>(null)
  const [ searchTerm, setSearchTerm ] = useState('')
  const [type, setType] = useState<SearchType>(SearchType.name)
  const [presentAlert] = useIonAlert()
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, dismiss] = useIonLoading()

  useEffect(() => {
    if (searchTerm === '') {
      setResults([])
      return
    }

    console.log(randomDrink)
    const loadDrinks = async () => {
      await loading()
      const result: any = await searchData(searchTerm, type)
      console.log('result', result)
      await dismiss()
      if (result?.Error) {
        presentAlert(result.Error)
      } else if (result.drinks == 'no data found') {
          setResults([])
      } else if (result.ingredients) {
          setResults(result.ingredients)
      } else if (result.drinks) {
          setResults(result.drinks)
      }
    }    
    loadDrinks()
  }, [searchTerm, type])


useIonViewWillEnter(() => {
    const fetchRandomDrink = async () => {
      const data = await randomDrink()
      setRandomDrinkId(data)
    }
    fetchRandomDrink()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonTitle>Cocktail App</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSearchbar
            value={searchTerm}
            debounce={500}
            autocapitalize='off'
            onIonChange={(e) => setSearchTerm(e.detail.value!)}
            ></IonSearchbar>
            <IonItem>
              <IonSelect label='Select Search Type' value={type} onIonChange={(e) => setType(e.detail.value!)}>
                <IonSelectOption value='name'>Drink</IonSelectOption>
                <IonSelectOption value='ingredient'>Ingredient</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonList>
              {results.length > 0 && results.map((item: SearchResult) => (
                <IonItem button key={item.idDrink} routerLink={`/Cocktails/${item.idDrink}`}>
                  <IonAvatar slot='start'>
                    <img src={item.strDrinkThumb} alt={item.strDrink} />
                  </IonAvatar>
                  <IonLabel>
                    <h2>{item.strDrink}</h2>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>    
        </IonContent>
        <IonFooter>
          <IonButton className='try-button' expand='full' routerLink={`/Cocktails/${randomdrink}`}>
            Try your luck
          </IonButton>
        </IonFooter>
    </IonPage>
  );
};

export default Home;

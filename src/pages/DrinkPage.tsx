

import { IonItem, IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter, IonCard, IonImg, IonCardTitle, IonCardContent, IonCardHeader, IonCardSubtitle } from '@ionic/react'
import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'
import useApi, { SearchError } from '../hooks/useApi'
import { DrinkDetails } from '../hooks/useApi'



interface DrinkPageProps 
    extends RouteComponentProps<{
        id: string
    }> {}

const DrinkPage : React.FC<DrinkPageProps> = ({match}) => {
    const { getDrinkDetails } = useApi()
    const [information, setInformation] = useState<DrinkDetails|null>(null)

    useIonViewWillEnter(() => {
        const id = match.params.id
        getDrinkDetails(id).then(data => {
            setInformation(data)
            console.log('dataresults', data)
        })
    })


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/Cocktails'></IonBackButton>
                    </IonButtons>
                    <IonTitle>{information?.strCategory}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {information && (
                    <IonCard>
                        <IonImg src={information?.strDrinkThumb}/>
                            <IonCardTitle className='ion-padding'>{information?.strDrink}</IonCardTitle>
                            <IonCardContent>{information?.strInstructions}</IonCardContent>
                            <IonCardContent className='ion-padding'>
                                {Array.from({length: 15}).map((_, i) => {
                                    const ingredient = (information as any)[`strIngredient${i+1}`]
                                    let measure = (information as any)[`strMeasure${i+1}`]
                                    if (measure && measure.includes('oz')) {
                                        const oz = parseFloat(measure.replace('oz', '').trim())
                                        // this cl is because some drinks dont like oz
                                        const cl = oz * 2
                                        console.log('measure', cl)
                                         measure = `${cl.toFixed(0)} cl`
                                    } else if (measure === null){
                                        measure = ''
                                    }

                                    return ingredient || measure ? (
                                        <div key={i}>
                                            <IonCardSubtitle>{`${ingredient} ${measure}`}</IonCardSubtitle>
                                        </div>
                                    ) : null
                                })}
                            </IonCardContent>
                        </IonCard>
                    )}
            </IonContent>
        </IonPage>
    );
};

export default DrinkPage;
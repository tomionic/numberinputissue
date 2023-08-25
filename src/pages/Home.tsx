import { IonContent, IonInput, IonPage, IonText } from '@ionic/react';
import { useState } from 'react';

const Home: React.FC = () => {
  const [ value, setValue ] = useState<string | null | undefined>();
  return (
    <IonPage className="ion-padding-top">
      <IonContent fullscreen className="ion-padding">
        <IonInput
          label='Input'
          value={ value }
          type="number"
          onIonInput={ event => setValue(event.detail.value) }
        />
        <IonText>{ `Output value: ${value}` }</IonText>
      </IonContent>
    </IonPage>
  );
};

export default Home;

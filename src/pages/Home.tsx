import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useForm } from 'react-hook-form';
import HookInput from '../hook-wrappers/HookInput';

const Home: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      test: ""
    }
  });
  const submitForm = (formData: any) => {
    console.log(formData);
  }
  return (
    <IonPage className="ion-padding-top">
      <IonContent fullscreen className="ion-padding">
        <HookInput
          control={ control }
          errors={ errors }
          label="Test input"
          configKey="test"
          type="number"
          requiredError="This fiels is required"
        />
        <IonButton expand="full" onClick={ handleSubmit(submitForm) }>Submit</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;

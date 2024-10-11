import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { ListCenter } from '../components/listCenter/ListCenter';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{'fontSize':'clamp(1.1rem, 2vw, 2rem)'}}>SEDE HOSPITALARIA AXA COLPATRIA</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle style={{'fontSize':'clamp(1.1rem, 2vw, 2rem)'}}>SEDE HOSPITALARIA AXA COLPATRIA</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ListCenter/>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonCard color="danger">
            <IonCardHeader>
              <IonCardSubtitle style={{fontSize:'12px', color:'#ffcbcb'}}>Primer Respondiente (3016404867)</IonCardSubtitle>
              <IonCardSubtitle style={{fontSize:'12px', color:'#ffcbcb'}}>Líder PESV (3016404867)</IonCardSubtitle>
              <IonCardSubtitle style={{fontSize:'12px', color:'#ffcbcb'}}>Lider SST (3016404867)</IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;

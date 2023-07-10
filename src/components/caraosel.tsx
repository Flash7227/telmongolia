import { getCaraosel } from '../api/rest'
import ImageSlider from './imageSlider';

const Caraosel = async () => {
    const caraosel = await getCaraosel();
    return (
        <div>
            <ImageSlider data={caraosel} />
        </div>
    );
}

export default  Caraosel;

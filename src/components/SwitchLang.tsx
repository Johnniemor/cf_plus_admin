import i18n from '@/lang/i18n';
import Lao from '@/assets/counties/la.png';
import English from '@/assets/counties/en.png';
import { switchLanguage } from '@/utils/switch_lang';

const SwitchLang: React.FC = () => {
  return (
    <div>
      <div onClick={switchLanguage} className="cursor-pointer">
        {i18n.language === 'la' ? (
          <img src={English} alt="English" className="h-8 w-8" title="English" />
        ) : (
          <img src={Lao} alt="ພາສາລາວ" className="h-8 w-8" title="ພາສາລາວ" />
        )}
      </div>
    </div>
  );
};

export default SwitchLang;

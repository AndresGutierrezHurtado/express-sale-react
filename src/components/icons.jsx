import { IoSearch, IoMenu } from "react-icons/io5";
import { MdOutlineShoppingBag, MdOutlineEmail } from "react-icons/md";
import { TbLogin2 } from "react-icons/tb";
import {
    FaArrowUpFromBracket,
    FaArrowRight,
    FaBoxesStacked,
    FaPlus,
    FaCartShopping,
    FaCartPlus,
    FaFlag,
    FaShop,
} from "react-icons/fa6";
import {
    FaUser,
    FaPhoneAlt,
    FaRegStar,
    FaStarHalf,
    FaStar,
    FaRegTrashAlt,
    FaHome,
} from "react-icons/fa";
import { HiPencil, HiDotsVertical } from "react-icons/hi";
import { IoMdEye } from "react-icons/io";

export const SearchIcon = ({ size = 20, ...props }) => (
    <IoSearch size={size} {...props} />
);

export const MenuIcon = ({ size = 20, ...props }) => (
    <IoMenu size={size} {...props} />
);

export const ShoppingBagIcon = ({ size = 20, ...props }) => (
    <MdOutlineShoppingBag size={size} {...props} />
);

export const LoginIcon = ({ size = 20, ...props }) => (
    <TbLogin2 size={size} {...props} />
);

export const RegisterIcon = ({ size = 20, ...props }) => (
    <FaArrowUpFromBracket size={size} {...props} />
);

export const ArrowRight = ({ size = 20, ...props }) => (
    <FaArrowRight size={size} {...props} />
);

export const PencilIcon = (props) => <HiPencil {...props} />;

export const EmailIcon = (props) => <MdOutlineEmail {...props} />;

export const UserIcon = (props) => <FaUser {...props} />;

export const PhoneIcon = (props) => <FaPhoneAlt {...props} />;

export const StarIcon = (props) => <FaStar {...props} />;

export const RegStarIcon = (props) => <FaRegStar {...props} />;

export const HalfStarIcon = (props) => <FaStarHalf {...props} />;

export const BoxesStackedIcon = (props) => <FaBoxesStacked {...props} />;

export const CartIcon = (props) => <FaCartShopping {...props} />;

export const CartAddIcon = (props) => <FaCartPlus {...props} />;

export const PlusIcon = (props) => <FaPlus {...props} />;

export const EyeIcon = (props) => <IoMdEye {...props} />;

export const DotsIcon = (props) => <HiDotsVertical {...props} />;

export const FlagIcon = (props) => <FaFlag {...props} />;

export const TrashIcon = (props) => <FaRegTrashAlt {...props} />;

export const HomeIcon = (props) => <FaHome {...props} />;

export const ShopIcon = (props) => <FaShop {...props} />;

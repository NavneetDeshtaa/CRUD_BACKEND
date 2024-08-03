import { Router } from 'express';
import { register,login,addUser,getUser,updateUser,deleteUser} from '../controllers/userController';
import auth from "../auth/jwtTokens";

const router = Router();

router.post('/registers', register);
router.post('/login', login);
router.post('/add', addUser);
router.get('/:username',auth, getUser);
router.put('/:username',auth, updateUser);
router.delete('/:username',auth, deleteUser);

export default router;

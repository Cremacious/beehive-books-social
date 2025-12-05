import {create} from 'zustand';
import { toast } from 'sonner';
import {createPromptAction, editPromptAction, deletePromptAction} from '@/actions/prompt.actions';

interface PromptStoreType {}

export const usePromptStore = create<PromptStoreType>((set, get) => ({}));
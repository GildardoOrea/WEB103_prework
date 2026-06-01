import { createClient } from '@supabase/supabase-js'


const URL = 'https://bsnudywyruccfhfcjadf.supabase.co'
const API_KEY = 'sb_publishable_9ZEjRCxde-1yIjURrjMc5w_56OjG_jY'

export const supabase = createClient(URL, API_KEY)
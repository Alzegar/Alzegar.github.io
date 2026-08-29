import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xoyosmdksmmodmbpcozd.supabase.co'
const supabaseKey = 'sb_publishable_dx1yj7UiZVP295X0Ly02Ug_pk4Fjnu5'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
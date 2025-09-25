import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    }
  }

  try {
    const data = JSON.parse(event.body)
    console.log("📩 Dados recebidos:", data)

    const { error } = await supabase
      .from('responses')
      .insert([{
        nome: data.nome,
        sobrenome: data.sobrenome,
        idade: data.idade,
        escolaridade: data.escolaridade,
        opiniao_evento: data.opiniao_evento,
        opiniao_cursos: data.opiniao_cursos
      }])

    if (error) {
      console.error("❌ Erro Supabase:", error)
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Erro ao salvar os dados', error })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Dados salvos com sucesso!' })
    }
  } catch (err) {
    console.error("❌ Erro inesperado:", err)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro interno no servidor' })
    }
  }
}

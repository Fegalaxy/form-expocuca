// receber-form.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    }
  }

  // Pega os dados enviados no formulário (esperando JSON)
  const data = JSON.parse(event.body)

  // Insere os dados na tabela "responses"
  const { error } = await supabase
    .from('responses')
    .insert([
      {
        nome: data.nome,
        sobrenome: data.sobrenome,
        idade: data.idade,
        escolaridade: data.escolaridade,
        opiniao_evento: data.opiniao_evento,
        opiniao_cursos: data.opiniao_cursos
      }
    ])

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao salvar os dados', error })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Dados salvos com sucesso!' })
  }
}

exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Função funcionando 🚀" })
  }
}

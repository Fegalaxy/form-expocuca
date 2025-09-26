import { createClient } from '@supabase/supabase-js'

// Variáveis de ambiente do Netlify (configure no Dashboard → Site settings → Environment variables)
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    }
  }

  try {
    const data = JSON.parse(event.body)
    console.log("📩 Dados recebidos:", data)

    // Tenta inserir no Supabase
    const { error } = await supabase
      .from('responses')
      .insert([
        {
          nome: data.nome,
          sobrenome: data.sobrenome,
          email: data.email,
          idade: data.idade,
          escolaridade: data.escolaridade,
          opiniao_evento: data.opiniao_evento,
          opiniao_cursos: data.opiniao_cursos
        }
      ])

    if (error) {
      console.error("❌ Erro Supabase:", error)

      // Tratamento especial para e-mail duplicado
      if (error.code === "23505") {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Este e-mail já foi usado. Tente outro." })
        }
      }

      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Erro ao salvar os dados", error })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Dados salvos com sucesso!" })
    }

  } catch (err) {
    console.error("⚠️ Erro inesperado:", err)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erro inesperado", error: err.message })
    }
  }
}

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const data = req.body
    console.log("📩 Dados recebidos:", data)

    const { error } = await supabase.from('responses').insert([
      {
        nome: data.nome,
        sobrenome: data.sobrenome,
        email: data.email,
        cpf: data.cpf,
        telefone: data.telefone,
        endereco: data.endereco,
        tipo: data.tipo,
        idade: data.idade,
        escolaridade: data.escolaridade,
        opiniao_evento: data.opiniao_evento,
        opiniao_cursos: data.opiniao_cursos,
        interesse_curso: data.interesse_curso
      }
    ])

    if (error) {
      console.error("❌ Erro Supabase:", error)
      return res.status(500).json({ message: 'Erro ao salvar os dados', error })
    }

    return res.status(200).json({ message: 'Dados salvos com sucesso!' })

  } catch (err) {
    console.error("⚠️ Erro inesperado:", err)
    return res.status(500).json({ message: 'Erro inesperado', error: err.message })
  }
}

import type { NextApiRequest }  from 'next'
import type { NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.body)
}

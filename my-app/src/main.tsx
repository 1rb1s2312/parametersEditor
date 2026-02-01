import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ParamEditor from './components/ParamEditor'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ParamEditor params={[
{
  "id": 1,
  "name": "Назначение",
  type: 'string'
},
{
  "id": 2,
  "name": "Длина",
  type: 'string'
}
]} model={{"paramValues": [
{
"paramId": 1,
"value": "повседневное"
},
{
"paramId": 2,
"value": "макси"
}
]}} />
  </StrictMode>,
)

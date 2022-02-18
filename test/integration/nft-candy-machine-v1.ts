import { Idl, Solita } from '../../src/solita'
import test from 'tape'
import path from 'path'
import {
  verifySyntacticCorrectnessForGeneratedDir,
  verifyTopLevelScriptForGeneratedDir,
} from '../utils/verify-code'
import json from './fixtures/nft_candy_machine_v1.json'

const outputDir = path.join(__dirname, 'output', 'ncm')
const generatedSDKDir = path.join(outputDir, 'generated')

test('renders type correct SDK for nft-candy-machine v1', async (t) => {
  const idl = json as Idl
  idl.metadata = {
    ...idl.metadata,
    address: 'cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ',
  }
  const gen = new Solita(idl, { formatCode: true })
  await gen.renderAndWriteTo(generatedSDKDir)
  await verifySyntacticCorrectnessForGeneratedDir(t, generatedSDKDir)
  await verifyTopLevelScriptForGeneratedDir(t, generatedSDKDir)
})

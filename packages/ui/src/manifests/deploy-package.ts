import type { ManifestBuilder } from '@radixdlt/radix-engine-toolkit'
import blake from 'blakejs'
import { Buffer } from 'buffer'

export function hash(input: string): Buffer {
	return Buffer.from(blake.blake2bHex(Buffer.from(input, 'hex'), undefined, 32).toString(), 'hex')
}

interface DeployPackage {
	wasm: string
	schema: string
	badge: string
}

export const getDeployPackageManifest = (manifest: ManifestBuilder, { wasm, schema, badge }: DeployPackage) => manifest
// manifest.publishPackage(
// 	wasm,
// 	schema,
// 	new ManifestAstValue.Map(ManifestAstValue.Kind.String, ManifestAstValue.Kind.Tuple, []),
// )

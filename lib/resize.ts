import path from 'path'
import jimp from 'jimp-compact'

export const resize = async ({ input, distDir, sizes }: {
  input: string
  distDir: string
  sizes: number[][]
}) => {
  const inputFile = await jimp.read(input)

  // Icons
  await Promise.all(sizes.map(normalizeSize).map((size: number[]) => {
    const name = sizeName(size)
    const distFile = path.join(distDir, `${name}.png`)
    return new Promise<void>((resolve) => {
      inputFile.clone().contain(size[0], size[1]).write(distFile, () => resolve())
    })
  }))
}

resize(JSON.parse(process.argv[2])).then(() => {
  process.exit()
}).catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})

const sizeName = (size: number[]): string => {
  size = normalizeSize(size)
  const prefix = size[2] ? (size[2] + '_') : ''
  return prefix + size[0] + 'x' + size[1]
}

const normalizeSize = (size: number[]): number[] => {
  if (!Array.isArray(size)) {
    size = [size, size]
  }
  if (size.length === 1) {
    size = [size[0], size[0]]
  } else if (size.length === 0) {
    size = [64, 64]
  }
  return size
}

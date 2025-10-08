import { ColorDAO } from '../application/ColorDAO'
import { ColorDTO } from '../application/ColorDTO'

export class SqliteColorDAO implements ColorDAO {

  public async create( color:ColorDTO ) {
    await api.sqlite.run(
      /* sql */ `INSERT INTO RgbColor ( id, name, red, green, blue, palette )
      VALUES ( @id, @name, @red, @green, @blue, @palette )`,
      color,
    )
  }

  public filterByPalette( palette:string ): Promise<ColorDTO[]> {
    return api.sqlite.all<ColorDTO>(
      /* sql */ `SELECT * FROM RgbColor WHERE palette = @palette`, { palette },
    )
  }

}

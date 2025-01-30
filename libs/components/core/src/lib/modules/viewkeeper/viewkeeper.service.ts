import { Injectable, Optional } from '@angular/core';
import { SkyAppViewportService } from '@skyux/theme';

import { SkyViewkeeper } from './viewkeeper';
import { SkyViewkeeperHostOptions } from './viewkeeper-host-options';
import { SkyViewkeeperOptions } from './viewkeeper-options';

/**
 * Provides methods for creating and destroying viewkeeper instances.
 */
@Injectable({
  providedIn: 'root',
})
export class SkyViewkeeperService {
  #hostOptions: SkyViewkeeperHostOptions | undefined;
  #viewportService: SkyAppViewportService | undefined;

  constructor(
    @Optional() hostOptions?: SkyViewkeeperHostOptions,
    @Optional() viewportService?: SkyAppViewportService,
  ) {
    this.#hostOptions = hostOptions;
    this.#viewportService = viewportService;
  }

  /**
   *
   * @param options Creates a viewkeeper instance, applying host options where applicable.
   */
  public create(options: SkyViewkeeperOptions): SkyViewkeeper {
    options = Object.assign({}, this.#hostOptions || {}, options);

    return new SkyViewkeeper(options, this.#viewportService);
  }

  /**
   * Destroys a viewkeeper instance.
   * @param vk Viewkeeper instance to destroy.
   */
  public destroy(vk: SkyViewkeeper): void {
    vk.destroy();
  }
}

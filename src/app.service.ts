import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  /**
   * @param zipCode
   * @returns
   */
  async findAddressByCep(
    zipCode: string,
    source: string | undefined,
  ): Promise<any> {
    const apis = {
      viacep: `https://viacep.com.br/ws/${zipCode}/json/`,
      opencep: `https://opencep.com/v1/${zipCode}`,
      brasilapi: `https://brasilapi.com.br/api/cep/v2/${zipCode}`,
    };

    if (source) {
      const url = apis[source.toLowerCase()];
      if (!url) {
        return { error: 'Source API not found' };
      }
      try {
        const response = await axios.get(url, { timeout: 3000 });
        const data = response.data;

        if (data && !data.erro && !data.message) {
          const normalizedData = this.normalizeData(source, data);
          return normalizedData;
        } else {
          return { error: 'CEP not found' };
        }
      } catch (error) {
        console.error(
          `Error in trying fetch zip code by API ${url}:`,
          error.message,
        );
        return { error: 'Error fetching data from the source API' };
      }
    } else {
      for (const [source, url] of Object.entries(apis)) {
        try {
          const response = await axios.get(url, { timeout: 3000 });
          const data = response.data;

          if (data && !data.erro && !data.message) {
            const normalizedData = this.normalizeData(source, data);
            return normalizedData;
          }
        } catch (error) {
          console.error(
            `Error in trying fetch zip code by API ${url}:`,
            error.message,
          );
        }
      }
    }

    return { error: 'CEP not found in any API' };
  }

  /**
   * @param data
   * @returns
   */
  private normalizeData(source: string, data: any): any {
    return {
      zip_code: data.cep,
      street: data.logradouro || data.street,
      neighborhood: data.bairro || data.neighborhood,
      city: data.localidade || data.city,
      state: data.uf || data.state,
      source: source,
    };
  }
}

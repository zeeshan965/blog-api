import { Query, Resolver } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import axios, { AxiosResponse } from 'axios';

@Resolver(() => String)
export class AppResolver {
  constructor(private readonly httpService: HttpService) {}

  /**
   *
   */
  @Query(() => String)
  index(): string {
    const url = 'https://webrtc.org/getting-started/remote-streams';
    /*fetch(url, { method: 'GET' })
      .then(async (response) => response.text())
      .then((data) => data)
      .catch((error) => console.error(error));*/

    /*axios
      .get(url)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));*/

    /*this.httpService.get(url).subscribe((res) => {
      console.log(res.data);
    });*/

    return 'Nest JS GQL';
  }
}

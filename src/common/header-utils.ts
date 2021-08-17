import {Response} from 'express';
import {Page} from '../domain/base/pagination.entity';

export class HeaderUtils {
    static addPaginationHeaders<T>(res: Response, page: Page<T>): any {
        const url = res.req.url;
        res.set('X-Total-Count', page.total.toString());
        const pageNumber = page.pageable.page;
        const pageSize = page.pageable.size;
        const links = [];
        if (pageNumber < page.total - 1) {
            links.push(this.prepareLink(url, pageNumber + 1, pageSize, 'next'));
        }
        if (pageNumber > 0) {
            links.push(this.prepareLink(url, pageNumber - 1, pageSize, 'prev'));
        }
        links.push(this.prepareLink(url, page.total - 1, pageSize, 'last'));
        links.push(this.prepareLink(url, 0, pageSize, 'first'));
        res.set('Link', links.join(','));
    }

    private static prepareLink(url, pageNumber, pageSize, relType): any {
        url = new URL('http://localhost' + url);
        url.searchParams.set('page', pageNumber);
        url.searchParams.set('size', pageSize);
        url = url.toString().replace('http://localhost', '');
        return `<${url}>; rel="${relType}"`;
    }
}

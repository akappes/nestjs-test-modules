import {Command} from 'nestjs-command';
import {Injectable} from '@nestjs/common';
import {ElasticsearchService} from "@nestjs/elasticsearch";
import {RequestParams} from "@elastic/elasticsearch";

@Injectable()
export class CreateIndexCommand {
    constructor(private readonly elasticsearchService: ElasticsearchService) {
    }

    // autoExit defaults to `true`, but you can use `autoExit: false` if you need more control
    @Command({command: 'create:index', describe: 'create index to bidding', autoExit: true})
    async create() {
        const {body, statusCode} = await this.elasticsearchService.indices.exists({
            index: 'bidding'
        });
        if (body === true) {
            await this.elasticsearchService.indices.delete({
                index: 'bidding'
            });
        }
        await this.elasticsearchService.indices.create({
            index: 'bidding',
            body: {
                settings: {
                    index: {
                        number_of_shards: 1,
                        number_of_replicas: 1
                    },
                    analysis: {
                        analyzer: {
                            my_custom_analyzer: {
                                type: "custom",
                                tokenizer: "filtersearch",
                                filter: [
                                    "lowercase", "decimal_digit", "asciifolding"
                                ]
                            }
                        },
                        tokenizer: {
                            filtersearch: {
                                type: "pattern",
                                pattern: "[^\w&àáâãäåÀÁÂÃÄÅèéêëÈÉÊËìíîïÌÍÎÏòóôõöÒÓÔÕÖùúûüÙÚÛÜçÇýÝÿñÑ]+"
                            }
                        }
                    }
                },
                mappings: {
                        "properties": {
                            "cnaes": {
                                "properties": {
                                    "code": {
                                        "type": "keyword"
                                    },
                                    "confidence": {
                                        "type": "double"
                                    },
                                    "id": {
                                        "type": "integer"
                                    },
                                    "name": {
                                        "type": "keyword"
                                    }
                                }
                            },
                            "description": {
                                "type": "text",
                                "index_options": "offsets",
                                "fielddata": true
                            },
                            "url": {
                                "type": "keyword"
                            },
                            "total_value": {
                                "type": "double"
                            },
                        }
                    }
            }
        });
    }
}

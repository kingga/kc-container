import { pascalcase } from '../src/helpers/pascalcase';
import { expect } from 'chai';

describe('Helpers', () => {
    describe('pascalcase', () => {
        it('can create a pascal case from a single word', () => {
            expect(pascalcase('foo')).to.equal('Foo');
        });

        it('can create a pascal case from multiple words', () => {
            expect(pascalcase('foo bar')).to.equal('FooBar');
        });

        it('should ignore uppercase letters in a single word', () => {
            expect(pascalcase('fooBar')).to.equal('FooBar');
        });

        it('should only uppercase the first letter if there is only one character', () => {
            expect(pascalcase('f')).to.equal('F');
        });

        it('should return the raw string if there is nothing to uppercase', () => {
            const raw = '!@# #$';
            expect(pascalcase(raw)).to.equal(raw);
        });

        it('should return an empty string if the string is empty', () => {
            expect(pascalcase('')).to.be.empty;
        });
    });
});

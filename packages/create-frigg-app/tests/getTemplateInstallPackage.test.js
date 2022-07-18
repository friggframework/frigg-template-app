/**
 * Copyright (c) 2022 Frigg Integration Framework
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { getTemplateInstallPackage } = require('../createFriggApp');

describe('getTemplateInstallPackage', () => {
  it('no options gives cfa-template', async () => {
    await expect(getTemplateInstallPackage()).resolves.toBe('cfa-template');
  });

  it('cfa-template gives cfa-template', async () => {
    await expect(getTemplateInstallPackage('cfa-template')).resolves.toBe(
      'cfa-template'
    );
  });

  it('cfa-template@next gives cfa-template@next', async () => {
    await expect(getTemplateInstallPackage('cfa-template@next')).resolves.toBe(
      'cfa-template@next'
    );
  });

});
